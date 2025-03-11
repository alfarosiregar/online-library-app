import emailjs from "emailjs-com";
import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function ContactView() {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as {
      name: string;
      email: string;
      message: string;
    };

    try {
      const response = await emailjs.send(
        "online-library_9e7annf",
        "template_hsvunq7",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "szeJYSUEGH31Sk-QU",
      );

      console.log("Email berhasil dikirim:", response);
      alert("Pesan berhasil dikirim!");
    } catch (error) {
      console.error("Error mengirim email:", error);
      alert("Gagal mengirim pesan. Coba lagi!");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-4xl w-full mx-auto grid md:grid-cols-2 gap-8 mt-16">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">Hubungi Saya</h1>
          <p className="text-gray-600">
            Punya pertanyaan? Jangan ragu untuk menghubungi saya!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-lg border-2 border-gray-500 bg-white shadow-md p-2 text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-lg border-2 border-gray-500 bg-white shadow-md p-2 text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 block w-full rounded-lg border-2 border-gray-500 bg-white shadow-md p-2 text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="w-5 h-5" />
              <span>afdolfarosir23@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="w-5 h-5" />
              <span>+62 822-1581-0187</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>Medan, Sumatera Utara, Indonesia</span>
            </div>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Media Sosial
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
