
import React, { useState } from 'react';
import AnimatedElement from './AnimatedElement';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Enviando...');
    // Mock form submission
    setTimeout(() => {
      setStatus('Mensagem enviada com sucesso! (Simulação)');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-gray-900/70 backdrop-blur-sm rounded-t-3xl">
      <div className="container mx-auto px-6">
        <AnimatedElement type="heading">
          <h2 className="text-4xl font-bold text-center mb-4">Contato</h2>
          <p className="text-center text-gray-400 mb-12">Vamos trabalhar juntos. Me envie uma mensagem!</p>
        </AnimatedElement>
        
        <AnimatedElement delay={0.2}>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                placeholder="seu.email@exemplo.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensagem</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                placeholder="Descreva seu projeto ou ideia..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-cyan-500 text-black font-bold py-3 px-10 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                disabled={status === 'Enviando...'}
              >
                Enviar Mensagem
              </button>
            </div>
            {status && <p className="text-center mt-4 text-green-400">{status}</p>}
          </form>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default ContactSection;