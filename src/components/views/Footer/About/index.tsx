import Image from "next/image";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function AboutView() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-auto transform transition-all hover:scale-105 duration-300">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <Image
              src="/creator.jpg"
              width={150}
              height={150}
              alt="Profile Picture"
              className="rounded-full border-4 border-purple-500"
            />
          </div>
          <div className="md:w-2/3 md:pl-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Afdol Fahmul Rozi
            </h1>
            <h2 className="text-xl text-purple-600 mb-4">Web Developer</h2>
            <p className="text-gray-600 mb-4">
              Passionate about creating beautiful and functional web
              applications. With 2 years of experience, I specialize in React,
              Typescript Node.js, and cloud technologies.
            </p>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "TypeScript", "AWS"].map((skill) => (
              <span
                key={skill}
                className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
