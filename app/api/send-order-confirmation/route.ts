import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  const { order, customerEmail } = await req.json();

  const subject = `Order Confirmation - Order #${order.id || ''}`;
  const html = `
    <h2>Thank you for your order!</h2>
    <p>Your order has been confirmed. Details:</p>
    <pre>${JSON.stringify(order, null, 2)}</pre>
  `;

  // Send to customer
  await transporter.sendMail({
    from: `Tree Nuts <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject,
    html,
  });

  // Send to admin
  await transporter.sendMail({
    from: `Tree Nuts <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order Received - Order #${order.id || ''}`,
    html,
  });

  return NextResponse.json({ success: true });
} 