import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useOptimizedAnimations } from "../hooks/useOptimizedAnimations";
import emailjs from '@emailjs/browser';
import { emailjsConfig } from '../config/emailjs';

export default function ContactSection() {
  const { t } = useLanguage();
  const { animateContactSection } = useOptimizedAnimations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateContactSection();
    }, 100);

    return () => clearTimeout(timer);
  }, [animateContactSection]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      // EmailJS integration
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Magne Software',
        },
        emailjsConfig.publicKey
      );

      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      info: "hello@magne.io",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: "fas fa-phone",
      title: t("phone"),
      info: "+54 11 1234-5678",
      gradient: "from-violet-500 to-violet-700",
    },
    {
      icon: "fas fa-map-marker-alt",
      title: t("location"),
      info: "Buenos Aires, Argentina",
      gradient: "from-blue-500 to-violet-500",
    },
  ];

  const socialLinks = [
    { icon: "fab fa-linkedin", href: "#", color: "hover:bg-orange-500" },
    { icon: "fab fa-twitter", href: "#", color: "hover:bg-violet-500" },
    { icon: "fab fa-github", href: "#", color: "hover:bg-blue-500" },
    { icon: "fab fa-instagram", href: "#", color: "hover:bg-purple-500" },
  ];

  const serviceOptions = [
    { value: "game-dev", label: t("gameDevOption") },
    { value: "staff-aug", label: t("staffAugOption") },
    { value: "web-dev", label: t("webDevOption") },
    { value: "custom-soft", label: t("customSoftOption") },
    { value: "uiux", label: t("uiuxOption") },
    { value: "consulting", label: t("consultingOption") },
    { value: "other", label: t("other") },
  ];

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden section-background"
    >
      {/* Section Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-black z-0"></div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 z-1">
        <div className="grid-pattern w-full h-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 section-content">
        {/* Header Section - Visible on all devices */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="contact-badge inline-flex items-center px-3 sm:px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-jetbrains text-orange-500">
              {t("contactUs")}
            </span>
          </div>

          <h2 className="contact-title font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span>{t("writeToUs")}</span>
            <br />
            <span className="magne-gradient-text gradient-shift">
              {t("workTogether")}
            </span>
          </h2>

          <p className="contact-description text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("contactDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Contact Form Side - First on mobile */}
          <div className="contact-form-container order-1 lg:order-2">
            {/* Mobile Form Header */}
            <div className="lg:hidden mb-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{t("sendMessage")}</h3>
              <p className="text-gray-300 text-sm">✨ {t("fastResponse")}</p>
            </div>
            
            <form
              onSubmit={handleSubmit}
              className="contact-form bg-gradient-to-b from-slate-800/80 to-slate-700/80 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-2xl border-2 lg:border border-orange-500/40 lg:border-violet-500/20 hover:border-orange-500/60 lg:hover:border-orange-500/30 transition-all duration-500 shadow-xl lg:shadow-none"
              data-testid="contact-form"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Name Input */}
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2"
                  >
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/50 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder={t("fullNamePlaceholder")}
                    data-testid="input-name"
                  />
                </div>

                {/* Email Input */}
                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2"
                  >
                    {t("emailAddress")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/50 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm sm:text-base"
                    placeholder={t("emailPlaceholder")}
                    data-testid="input-email"
                  />
                </div>

                {/* Subject Input */}
                <div className="form-group">
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2"
                  >
                    {t("subject")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/50 border border-violet-500/30 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm sm:text-base"
                    data-testid="select-subject"
                  >
                    <option value="">{t("selectService")}</option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message Input */}
                <div className="form-group">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-300 mb-2"
                  >
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900/50 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none text-sm sm:text-base"
                    placeholder={t("messagePlaceholder")}
                    data-testid="textarea-message"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="submit-button"
                >
                  <span className="submit-text">
                    {isSubmitting ? t("sending") : t("sendMessage")}
                  </span>
                  {!isSubmitting && <i className="fas fa-paper-plane ml-2"></i>}
                  {isSubmitting && (
                    <i className="fas fa-spinner fa-spin ml-2"></i>
                  )}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div
                className="mt-6 p-6 bg-green-500/20 border border-green-500/30 rounded-xl"
                data-testid="success-message"
              >
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-400 mr-3"></i>
                  <span className="text-green-300">{t("successMessage")}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div
                className="mt-6 p-6 bg-red-500/20 border border-red-500/30 rounded-xl"
                data-testid="error-message"
              >
                <div className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-red-400 mr-3"></i>
                  <span className="text-red-300">{t("errorMessage")}</span>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info Side - Second on mobile */}
          <div className="contact-info order-2 lg:order-1 mt-8 lg:mt-0">
            {/* Contact Methods */}
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="contact-method flex items-center p-3 sm:p-4 bg-slate-800/50 rounded-xl border border-violet-500/20 hover:border-orange-500/50 transition-all duration-300"
                  data-testid={`contact-method-${index}`}
                >
                  <div
                    className={`method-icon w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${method.gradient} rounded-lg flex items-center justify-center mr-3 sm:mr-4`}
                  >
                    <i className={`${method.icon} text-white text-sm sm:text-base`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{method.title}</h4>
                    <p className="text-gray-300 text-sm sm:text-base">{method.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="social-links">
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">{t("followUs")}</h4>
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`social-link w-10 sm:w-12 h-10 sm:h-12 bg-slate-800 ${social.color} rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110`}
                    data-testid={`social-link-${index}`}
                  >
                    <i className={`${social.icon} text-white text-sm sm:text-base`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
