// apps/web-seo/components/HomePageClient.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const fadeSmallUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export default function HomePageClient() {
    return (
        <div id="main"
            data-framer-hydrate-v2="{&quot;routeId&quot;:&quot;augiA20Il&quot;,&quot;localeId&quot;:&quot;default&quot;,&quot;breakpoints&quot;:[{&quot;hash&quot;:&quot;72rtr7&quot;,&quot;mediaQuery&quot;:&quot;(min-width: 1200px)&quot;},{&quot;hash&quot;:&quot;1jqt3iz&quot;,&quot;mediaQuery&quot;:&quot;(min-width: 810px) and (max-width: 1199.98px)&quot;},{&quot;hash&quot;:&quot;1g7w4uk&quot;,&quot;mediaQuery&quot;:&quot;(max-width: 809.98px)&quot;},{&quot;hash&quot;:&quot;nb5wab&quot;,&quot;mediaQuery&quot;:&quot;(min-width: 1200px)&quot;},{&quot;hash&quot;:&quot;4rqgi&quot;,&quot;mediaQuery&quot;:&quot;(min-width: 810px) and (max-width: 1199.98px)&quot;},{&quot;hash&quot;:&quot;jdn3fb&quot;,&quot;mediaQuery&quot;:&quot;(max-width: 809.98px)&quot;}]}"
            data-framer-ssr-released-at="2025-11-27T17:26:44.256Z" data-framer-page-optimized-at="2025-11-28T04:14:48.749Z"
            data-framer-generated-page>
            <Navigation />
        </div>
    );
}
