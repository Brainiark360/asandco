// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="section-padding content-max-width">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-8 md:mb-0">
            <div className="font-playfair text-lg font-semibold text-gray-900 mb-2">
              Alexander Stephen & Co.
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              A strategy-first consultancy and digital marketing firm helping businesses grow through clarity, systems, and disciplined execution.
            </p>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>© Alexander Stephen & Co. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}