import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">
          © 2025 Color Accessibility Toolkit. All rights reserved.{" "}
          built with 💚 by <Link href="https://www.fb.com/Rahim72446" target="_blank" className="text-[#1952ae]">Abdur Rahim</Link>
        </p>
      </div>
    </>
  );
}
