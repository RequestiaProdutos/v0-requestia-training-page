import {
  loadPublicTemplate,
  renderTemplate,
} from "@/lib/email/template-engine";

interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function renderContactInternalEmail(data: ContactEmailPayload) {
  const template = await loadPublicTemplate("duvida-formstreinamento.html");

  return renderTemplate(template, {
    fullName: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });
}
