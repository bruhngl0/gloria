import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Field validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    console.log("Contact form submission received:", { name, email, subject, message });

    // Send email via Resend if key is configured, else fallback to log
    if (RESEND_API_KEY && !RESEND_API_KEY.includes("re_123456789")) {
      const resend = new Resend(RESEND_API_KEY);
      
      const { data, error } = await resend.emails.send({
        from: "Styled by Gloria Contact <onboarding@resend.dev>", // Replace with verified domain in production
        to: "gloria@styledbygloria.com", // Replace with client email
        subject: `SBG Inquiry: [${subject}] from ${name}`,
        html: `
          <h3>New Inquiry from Styled by Gloria Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        `,
      });

      if (error) {
        console.error("Resend API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, messageId: data?.id });
    }

    // Fallback Mock Mode Success
    return NextResponse.json({
      success: true,
      note: "Submission received successfully (Mock Mode active, check console logs).",
    });
  } catch (err: any) {
    console.error("Contact API handler error:", err);
    return NextResponse.json(
      { error: err.message || "Something went wrong." },
      { status: 500 }
    );
  }
}
