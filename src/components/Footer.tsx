import React from "react";
import { Instagram, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <a className="hover:text-primary transition-colors duration-300" href={href}>
      {children}
    </a>
  </li>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isInvestorPage = location.pathname === "/seja-um-investidor";
  
  const logoUrl = "https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/Design%20sem%20nome%20(6).png";
  // Usando o número padrão do NocoDB para consistência
  const whatsappNumber = "5511999999999";
  const message = "Olá, gostaria de mais informações sobre a DARK'SGYM!";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer className="bg-secondary border-t border-border mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand Info */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-4 mb-4">
              <img src={logoUrl} alt="DARK'SGYM Logo" className="w-20 h-20 object-cover" />
              <div>
                <h3 className="text-2xl font-bold font-display text-foreground">DARK'SGYM</h3>
                <p className="text-muted-foreground text-sm">Mais que uma academia, um estilo de vida.</p>
              </div>
            </div>
            {!isInvestorPage && (
              <p className="text-muted-foreground text-sm max-w-md">
                Av. Martim Francisco, 786 - Vila Alto de Santo André, Santo André, SP, 09230-700
                <br />
                Aberto 24h, todos os dias.
              </p>
            )}
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 font-display text-foreground">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <FooterLink href="#diferenciais">Diferenciais</FooterLink>
              <FooterLink href="#unidades">Unidades</FooterLink>
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-4 font-display text-foreground">Siga-nos</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://www.instagram.com/darks.gym/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 md:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} DARK'SGYM. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;