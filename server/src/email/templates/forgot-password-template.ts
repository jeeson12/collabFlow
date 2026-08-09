function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function forgotPasswordTemplate(resetUrl: string, userName?: string) {
  const safeUserName = escapeHtml(userName || 'there');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Reset your password</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #171717;
      ">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="padding: 40px 20px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 520px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  padding: 40px;
                "
              >
                <tr>
                  <td>

                    <h1 style="
                      margin: 0 0 24px;
                      font-size: 24px;
                      color: #171717;
                    ">
                      Reset your password
                    </h1>

                    <p style="
                      margin: 0 0 16px;
                      font-size: 15px;
                      line-height: 1.6;
                    ">
                      Hi ${safeUserName},
                    </p>

                    <p style="
                      margin: 0 0 24px;
                      font-size: 15px;
                      line-height: 1.6;
                    ">
                      We received a request to reset your CollabFlow
                      password. Click the button below to create a new one.
                    </p>

                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="margin-bottom: 24px;"
                    >
                      <tr>
                        <td>
                          <a
                            href="${resetUrl}"
                            style="
                              display: inline-block;
                              padding: 12px 20px;
                              background-color: #171717;
                              color: #ffffff;
                              text-decoration: none;
                              border-radius: 8px;
                              font-size: 14px;
                              font-weight: 600;
                            "
                          >
                            Reset password
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 0 0 16px;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #666666;
                    ">
                      This link will expire in 30 minutes.
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #666666;
                    ">
                      If you didn't request a password reset, you can safely
                      ignore this email.
                    </p>

                  </td>
                </tr>
              </table>

              <p style="
                margin: 20px 0 0;
                font-size: 12px;
                color: #999999;
              ">
                © ${new Date().getFullYear()} CollabFlow
              </p>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
