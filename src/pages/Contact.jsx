import { useState } from "react";
import Button from "../ui/Button";
import { useData } from "../context/data/useData";
import Loading from "../ui/Loading";
function Contact() {
  const { isLoading } = useData();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold mb-10">
        Get in touch!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-6 border border-neutral-600 bg-neutral-300 rounded-2xl text-neutral-900 py-8 px-6 shadow-lg"
      >
        <input
          type="text"
          placeholder="Name"
          className="border-2 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border-2 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your message..."
          className="border-2 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500"
          value={message}
          rows={4}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="primary"
          disabled={!name.trim() || !email.trim()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
} 
export default Contact;
