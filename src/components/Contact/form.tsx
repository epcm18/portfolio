import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import {
  AlertStatus,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useColorMode,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import useOnScreen from "../../hooks/use-on-screen";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm: React.FC = () => {
  const { colorMode } = useColorMode();
  const [isAlreadyRendred, setIsAlreadyRendred] = useState(false);
  // For performance reasons, we display the reCaptcha only when the form is visible on the view
  const formRef = useRef();
  const isOnScreen = useOnScreen(formRef);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 480px)", { ssr: false });

  useEffect(() => {
    if (isOnScreen) setIsAlreadyRendred(true);
  }, [isOnScreen]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const recaptchaRef = useRef(null);

  const [captchaError, setCaptchaError] = useState("");

  const toast = useToast();

  const _renderToast = (title: string, status: AlertStatus) => {
    return toast({
      title,
      status,
      position: "top",
      variant: "top-accent",
      isClosable: true,
    });
  };

  const submitForm = async (data: FormData) => {
    const captchaValue = recaptchaRef.current.getValue();

    if (!isValid) return;

    if (!captchaValue) {
      setCaptchaError("Robots are not welcome yet!");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        _renderToast("Your message has been successfully sent.", "success");
        reset();
        recaptchaRef.current.reset();
      } else {
        _renderToast("Sorry, something went wrong. Please try again.", "error");
      }
    } catch (error) {
      _renderToast("Sorry, something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data: FormData) => submitForm(data))}
      ref={formRef}
    >
      <Stack spacing={4}>
        {/* Name */}
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" {...register("name", { required: true })} />
          {!errors.name && (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        {/* Email */}
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type={"email"}
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address.",
              },
            })}
          />
          {!errors.email ? (
            <FormHelperText>
              Enter the email youd like to receive the response on.
            </FormHelperText>
          ) : errors.email?.type === "required" ? (
            <FormErrorMessage>Email is required. </FormErrorMessage>
          ) : (
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          )}
        </FormControl>
        {/* Message */}
        <FormControl isInvalid={!!errors.message} isRequired>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Textarea
            id="message"
            size="sm"
            {...register("message", { required: true })}
          />
          {!errors.message && (
            <FormErrorMessage>Message is required.</FormErrorMessage>
          )}
        </FormControl>
        {/* ReCAPTCHA */}
        {(isOnScreen || isAlreadyRendred) && (
          <FormControl isInvalid={!!captchaError} isRequired>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
              onChange={(value: string) =>
                setCaptchaError(value ? "" : "Robots are not welcome yet!")
              }
              theme={colorMode === "dark" ? "dark" : "light"}
              style={{
                margin: "0 auto",
                display: "table",
                transform: isMobile ? "scale(0.65)" : "scale(1)",
                transformOrigin: "center",
              }}
            />
            {!!captchaError && (
              <FormErrorMessage>{captchaError}</FormErrorMessage>
            )}
          </FormControl>
        )}
        {/* Submit button */}
        <Button
          width={"100%"}
          colorScheme="blue"
          bg="blue.400"
          color="white"
          _hover={{
            bg: "blue.500",
          }}
          type="submit"
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </Stack>
    </form>
  );
};
