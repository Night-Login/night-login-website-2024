import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProjectsPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/coming-soon");
    });
    return null;
}