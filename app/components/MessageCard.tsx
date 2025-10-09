type MessagePropsType = {
  role: "assistant" | "user";
  message: string;
};

export const MessageCard = (props: MessagePropsType) => {
  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g); // cari bagian **bold**
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <strong key={index}>{part.slice(1, -1)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={` px-6 text-lg shadow-md py-4 max-w-md w-fit whitespace-pre-line break-words ${
        props.role === "user"
          ? "bg-green-700 text-white ml-auto rounded-b-2xl rounded-tl-3xl"
          : "bg-white border rounded-b-2xl rounded-tr-3xl"
      }`}
    >
      {renderWithBold(props.message)}
    </div>
  );
};
