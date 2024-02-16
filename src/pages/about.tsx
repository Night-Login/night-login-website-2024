import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AboutPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/coming-soon");
    });
    return null;
}