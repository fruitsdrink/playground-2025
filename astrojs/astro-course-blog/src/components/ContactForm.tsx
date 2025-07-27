import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    if (!formData.get("email")) {
      toast.error("Please enter your email.");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate form submission delay
    setIsSubmitting(false);
    toast.success("Thanks! I'll be in touch.", { duration: 2000 });
    formRef.current?.reset();
  };

  return (
    <>
      <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <h2>Let's Connect</h2>
        <p>Reach out below for inquiries, quotes, or collaborations.</p>
        <label htmlFor="email">Your Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="e.g., katie@email.com"
        />
        <button className="link" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Contact Me"}
        </button>
      </form>
      <Toaster />
    </>
  );
}
