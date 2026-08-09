function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function workspaceInvitationTemplate(
  workspaceName: string,
  inviterName: string,
  invitationUrl: string,
) {
  const safeWorkspaceName = escapeHtml(workspaceName);
  const safeInviterName = escapeHtml(inviterName);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Workspace invitation</title>
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
                      You're invited to a workspace
                    </h1>

                    <p style="
                      margin: 0 0 16px;
                      font-size: 15px;
                      line-height: 1.6;
                    ">
                      ${safeInviterName} invited you to join
                      <strong>${safeWorkspaceName}</strong> on CollabFlow.
                    </p>

                    <p style="
                      margin: 0 0 24px;
                      font-size: 15px;
                      line-height: 1.6;
                    ">
                      Accept the invitation below to join the workspace
                      and start collaborating with your team.
                    </p>

                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="margin-bottom: 24px;"
                    >
                      <tr>
                        <td>
                          <a
                            href="${invitationUrl}"
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
                            Accept invitation
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 0;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #666666;
                    ">
                      This invitation will expire after 7 days.
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
