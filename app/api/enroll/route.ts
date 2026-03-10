import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      courseTitle,
      level,
      fullName,
      email,
      phone,
      role,
      company,
      compFinName,
      compFinEmail,
      isPCD,
      pcdDescription,
      additionalParticipants = []
    } = body

    const recipients = [
      'produtos@requestia.com',
      'caroline.rodrigues@requestia.com',
      'isabela.cassolla@requestia.com'
    ]

    const participantsList = additionalParticipants
      .map((p: any, idx: number) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Participante adicional ${idx + 1}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.addName}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.email}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.phone}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${p.role}</td>
        </tr>
      `)
      .join('')

    const emailHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #00233f; color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .section h3 { color: #00233f; font-size: 16px; margin-bottom: 10px; border-bottom: 2px solid #0D5B9C; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th { background-color: #f0f0f0; padding: 10px; text-align: left; font-weight: bold; color: #00233f; }
            td { padding: 8px; border-bottom: 1px solid #eee; }
            .label { font-weight: bold; color: #00233f; }
            .value { color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nova Inscrição Recebida</h2>
              <p style="font-size: 18px; margin: 10px 0 0 0;">${courseTitle}</p>
            </div>

            <div class="section">
              <h3>Dados do Participante Principal</h3>
              <table>
                <tr>
                  <td class="label">Nome Completo:</td>
                  <td class="value">${fullName}</td>
                </tr>
                <tr>
                  <td class="label">E-mail:</td>
                  <td class="value">${email}</td>
                </tr>
                <tr>
                  <td class="label">Telefone:</td>
                  <td class="value">${phone}</td>
                </tr>
                <tr>
                  <td class="label">Cargo/Função:</td>
                  <td class="value">${role}</td>
                </tr>
                <tr>
                  <td class="label">Empresa:</td>
                  <td class="value">${company}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Dados da Empresa</h3>
              <table>
                <tr>
                  <td class="label">Responsável Financeiro:</td>
                  <td class="value">${compFinName}</td>
                </tr>
                <tr>
                  <td class="label">E-mail do Responsável:</td>
                  <td class="value">${compFinEmail}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h3>Necessidades Especiais (PCD)</h3>
              <table>
                <tr>
                  <td class="label">Necessita acomodações:</td>
                  <td class="value">${isPCD ? 'Sim' : 'Não'}</td>
                </tr>
                ${isPCD && pcdDescription ? `
                <tr>
                  <td class="label">Descrição:</td>
                  <td class="value">${pcdDescription}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            ${additionalParticipants.length > 0 ? `
              <div class="section">
                <h3>Participantes Adicionais (${additionalParticipants.length})</h3>
                <table>
                  <tr>
                    <th>Tipo</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Cargo</th>
                  </tr>
                  ${participantsList}
                </table>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
              <p>Este é um e-mail automático gerado pelo sistema de inscrições da Requestia.</p>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: recipients,
      subject: `Nova inscrição: ${courseTitle}`,
      html: emailHtml
    })

    return Response.json({ success: true, messageId: response.id })
  } catch (error) {
    console.error('Error sending email:', error)
    return Response.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    )
  }
}
