import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './apiStatus.css';

const useApiStatus = (loading=false) => {

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState( loading);

  const navigate = useNavigate();

  const call = async ({ callbackApi, id, data }) => {
    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);
      setError(null);
      setMessage(null);

      let rawResponse;

      if (data && id)
        rawResponse = await callbackApi({ token, id, data });
      else if (data)
        rawResponse = await callbackApi({ token, data });
      else if (id)
        rawResponse = await callbackApi({ token, id });
      else
        rawResponse = await callbackApi({ token });

        // השורה הזו מחכה לתשובה מהשרת (rawResponse), וממירה אותה לאובייקט JSON שניתן לעבוד איתו.
       // לדוגמה: אם השרת מחזיר {"name":"דימה"}, אז responseBody יהיה { name: "דימה" }
      const responseBody = await rawResponse.json();

              // בדיקה אם התשובה מהשרת הצליחה:
        // 200 → OK (הצלחה רגילה)
        // 201 → Created (הצלחה עם יצירה חדשה, למשל שמירה של רשומה)
        // אם אחד מהם מתקיים, מחזירים את גוף התשובה (responseBody)
      if (rawResponse.status === 200 || rawResponse.status === 201) {
          return responseBody;
      }

      if (rawResponse.status === 400 || rawResponse.status === 404 || rawResponse.status === 409) {
        setError( responseBody?.error || "❌ לא התקבלה תגובה מהשרת או קרתה שגיאה בלתי צפויה");
      } else if (rawResponse.status === 403) {
        setError("⛔ אין לך הרשאה לבצע את הפעולה");
      } else if (rawResponse.status === 401) {
        navigate("/login");
      } else {
        setError("⚠️ תקלה כללית. נסה שוב מאוחר יותר");
      }

    } catch (err) {
      if (err.toString().includes("Failed to fetch")) {
        setError("🔌 השרת אינו זמין כרגע");
      } else {
        setError(err.toString());
      }
    } finally {
      setIsLoading(false);
    }

    return undefined;
  };

  return { error, setError, call, isLoading, message, setMessage };
};

export default useApiStatus;