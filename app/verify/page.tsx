'use client';
import React, { useState } from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  return (
    <div className="verify-body">
      <div className="verify-card">
        <div className="icon-box"><ShieldCheck size={48} color="#2f5a45" /></div>
        <h2>تحقق من بريدك الإلكتروني</h2>
        <p>أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك</p>
        
        <div className="otp-inputs" dir="ltr">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={e => {
                const newOtp = [...otp];
                newOtp[index] = e.target.value;
                setOtp(newOtp);
              }}
            />
          ))}
        </div>

        <button className="verify-btn">تأكيد الحساب</button>
        <button className="resend-btn">إعادة إرسال الرمز</button>
      </div>

      <style jsx>{`
        .verify-body { height: 100vh; display: grid; place-items: center; background: #f0f2f5; font-family: 'Tajawal', sans-serif; }
        .verify-card { background: white; padding: 40px; border-radius: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; max-width: 400px; }
        .icon-box { margin-bottom: 20px; }
        .otp-inputs { display: flex; gap: 10px; justify-content: center; margin: 30px 0; }
        .otp-inputs input { width: 45px; height: 55px; text-align: center; font-size: 24px; border: 2px solid #eee; border-radius: 10px; outline: none; transition: 0.3s; }
        .otp-inputs input:focus { border-color: #2f5a45; box-shadow: 0 0 10px rgba(47,90,69,0.1); }
        .verify-btn { width: 100%; background: #1f513e; color: white; border: none; padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; margin-bottom: 15px; }
        .resend-btn { background: none; border: none; color: #6a7a7a; font-size: 14px; cursor: pointer; text-decoration: underline; }
      `}</style>
    </div>
  );
}