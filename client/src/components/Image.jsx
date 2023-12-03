import { useState, useEffect } from "react";
function Image({ blob }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setSrc(reader.result);
    };
  }, [blob]);
  return <img style={{ width: 150, height: "auto" }} src={src} />;
}
export { Image };
