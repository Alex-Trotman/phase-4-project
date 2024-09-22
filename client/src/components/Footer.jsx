import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">Made by Alex Trotman</p>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className="text-sm">You can find me on:</p>
        <ul className="flex justify-center space-x-4">
          <li>
            <a
              href="https://github.com/Alex-Trotman"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub className="text-3xl" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/alex-trotman-7173b1245/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaLinkedin className="text-3xl" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
