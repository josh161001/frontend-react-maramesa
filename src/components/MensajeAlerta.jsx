import { useEffect } from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

export const MensajeAlerta = ({ message, setMessage }) => {
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div>
      {message.text && (
        <Message
          style={{
            position: "fixed",
            top: "20px",
            right: "30px",
            zIndex: 2000,
            minWidth: "20%",
          }}
          error={message.type === "error"}
          success={message.type === "success"}
          header={message.type === "error" ? "Error" : "Éxito"}
          content={message.text}
          list={[]}
        />
      )}
    </div>
  );
};
