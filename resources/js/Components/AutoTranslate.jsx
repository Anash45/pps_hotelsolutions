import { useEffect, useState } from "react";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function AutoTranslate({ text }) {
    let lang;
    try {
        const context = useAutoTranslate();
        lang = context?.lang || "en";
    } catch (e) {
        lang = "en";
    }

    const [translated, setTranslated] = useState(text);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Only translate if the locale is DE
        if (lang === "de") {
            setLoading(true);
            fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=de&dt=t&q=${encodeURIComponent(
                    text
                )}`
            )
                .then((res) => res.json())
                .then((data) => setTranslated(data[0][0][0]))
                .catch(() => setTranslated(text))
                .finally(() => setLoading(false));
        } else {
            // Always show the original English text if locale is EN
            setTranslated(text);
        }
    }, [text, lang]);

    return (
        <span style={{ whiteSpace: "pre-wrap" }}>
            {loading ? "..." : translated}
        </span>
    );
}
