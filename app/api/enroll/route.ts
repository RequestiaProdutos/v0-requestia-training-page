import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    console.log('[v0] API route called')
    console.log('[v0] RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
    
    if (!process.env.RESEND_API_KEY) {
      console.error('[v0] RESEND_API_KEY is not configured')
      return Response.json(
        { error: 'RESEND_API_KEY is not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    console.log('[v0] Resend instance created')
    
    const body = await request.json()
    console.log('[v0] Request body received:', { courseTitle: body.courseTitle, fullName: body.fullName })
    
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

    // During Resend testing phase, only verified email (produtos@requestia.com) can receive emails
    // Once you verify a domain in Resend, you can send to all recipients
    // For now, send to the verified testing email and include all recipient info in the email
    const testingEmail = 'produtos@requestia.com'
    const intendedRecipients = [
      'caroline.rodrigues@requestia.com',
      'isabela.cassolla@requestia.com',
      'philipe.shima@requestia.com'
    ]

    const recipientsInfo = [testingEmail, ...intendedRecipients]
      .map((r) => `<li>${r}</li>`)
      .join('')

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
              <h3>Destinatários da Inscrição</h3>
              <p style="margin: 10px 0; color: #666; font-size: 14px;">Esta inscrição foi enviada para:</p>
              <ul style="margin: 10px 0 10px 20px;">
                ${recipientsInfo}
              </ul>
            </div>

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

    console.log('[v0] Sending email to verified testing address:', testingEmail)
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: testingEmail,
      subject: `Nova inscrição: ${courseTitle}`,
      html: emailHtml
    })

    if (error) {
      console.error('[v0] Resend error:', error)
      return Response.json(
        { error: 'Failed to send email', details: error.message },
        { status: 500 }
      )
    }

    console.log('[v0] Email sent successfully:', data)
    return Response.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('[v0] Error sending email:', error)
    return Response.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    )
  }
}
}
