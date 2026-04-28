"use client";

import { useMemo, useState } from "react";
import { FaCcPaypal, FaMobileAlt, FaShieldAlt, FaWhatsapp } from "react-icons/fa";

type ManualPaymentCheckoutProps = {
  productName: string;
  price: string;
};

const paymentConfig = {
  whatsappNumber: "923475850991",
  easyPaisa: {
    accountNo: "03451722175",
    accountName: "Usman Zulfiqar",
  },
  jazzCash: {
    accountNo: "03024908493",
    accountName: "Yasmin Bibi",
  },
  paypal: {
    email: "usmanrahmaa6@gmail.com",
  },
};

const paymentMethods = [
  {
    id: "EasyPaisa",
    title: "EasyPaisa",
    subtitle: "Pakistan local transfer",
    icon: FaMobileAlt,
    details: [
      `Account No: ${paymentConfig.easyPaisa.accountNo}`,
      `Name: ${paymentConfig.easyPaisa.accountName}`,
    ],
  },
  {
    id: "JazzCash",
    title: "JazzCash",
    subtitle: "Pakistan mobile wallet",
    icon: FaMobileAlt,
    details: [
      `Account No: ${paymentConfig.jazzCash.accountNo}`,
      `Name: ${paymentConfig.jazzCash.accountName}`,
    ],
  },
  {
    id: "PayPal",
    title: "PayPal",
    subtitle: "International payment",
    icon: FaCcPaypal,
    details: [`Email: ${paymentConfig.paypal.email}`],
  },
];

export function ManualPaymentCheckout({
  productName,
  price,
}: ManualPaymentCheckoutProps) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);

  const activeMethod = useMemo(
    () => paymentMethods.find((method) => method.id === selectedMethod) ?? paymentMethods[0],
    [selectedMethod],
  );

  const handleFinalOrder = () => {
    const message = `Hello! I would like to purchase: ${productName}. Total: ${price}. I have sent the payment via ${activeMethod.title}. Please find the screenshot attached below for verification.`;
    const whatsappUrl = `https://wa.me/${paymentConfig.whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 text-white shadow-2xl shadow-slate-950/30">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-black p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-300">
          VIP Manual Checkout
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{productName}</h3>
        <p className="mt-2 text-4xl font-bold text-white">{price}</p>
        <p className="mt-3 text-sm text-slate-300">
          Select a payment method, send payment, then confirm through WhatsApp with
          your screenshot.
        </p>
      </div>

      <div className="space-y-4 bg-white p-5 text-slate-950 dark:bg-slate-950 dark:text-white">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isActive = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full rounded-[24px] border p-5 text-left transition-all duration-300 ${
                isActive
                  ? "border-sky-500 bg-sky-50 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:bg-slate-900"
                  : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:border-slate-800 dark:bg-slate-950"
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="rounded-2xl bg-slate-950 p-3 text-white dark:bg-sky-500">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-semibold">{method.title}</span>
                  <span className="text-sm text-muted">{method.subtitle}</span>
                  <span className="mt-3 block space-y-1 text-sm">
                    {method.details.map((detail) => (
                      <span key={detail} className="block font-medium">
                        {detail}
                      </span>
                    ))}
                  </span>
                </span>
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleFinalOrder}
          className="flex w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400"
        >
          <FaWhatsapp className="h-5 w-5" />
          Confirm & Send Screenshot
        </button>

        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <FaShieldAlt className="mt-0.5 h-4 w-4 text-emerald-500" />
          <p>
            <span className="font-semibold text-slate-900 dark:text-white">
              Manual Verification:
            </span>{" "}
            Orders are activated within 5-10 minutes of screenshot submission.
          </p>
        </div>
      </div>
    </div>
  );
}
