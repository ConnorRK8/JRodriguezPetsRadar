import { IncidentCDto } from "src/core/interfaces/incident.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generateLostPetEmailTemplate = (incident: IncidentCDto): string => {
  const imageUrl = generateMapboxImage(incident.lat, incident.lon);
  const date = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Segoe UI',Roboto,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5;padding:32px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                        <tr>
                            <td style="background:linear-gradient(135deg,#e67e22,#e67e22cc);padding:32px 40px;">
                                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.3;">
                                    Mascota perdida: ${incident.title}
                                </h1>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:32px 40px 0;">
                                <h2 style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">
                                    Descripcion
                                </h2>
                                <p style="margin:0;font-size:16px;color:#1f2937;line-height:1.6;">
                                    ${incident.description}
                                </p>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:24px 40px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8f9fb;border-radius:12px;overflow:hidden;">
                                    <tr>
                                        <td style="padding:20px 24px;">
                                            <h2 style="margin:0 0 16px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">
                                                Ubicacion aproximada
                                            </h2>
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td width="50%" style="padding-bottom:8px;">
                                                        <span style="font-size:12px;color:#9ca3af;font-weight:500;">Latitud</span><br/>
                                                        <span style="font-size:15px;color:#1f2937;font-weight:600;">${incident.lat}</span>
                                                    </td>
                                                    <td width="50%" style="padding-bottom:8px;">
                                                        <span style="font-size:12px;color:#9ca3af;font-weight:500;">Longitud</span><br/>
                                                        <span style="font-size:15px;color:#1f2937;font-weight:600;">${incident.lon}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:24px 40px;">
                                <img src="${imageUrl}" width="520" style="width:100%;border-radius:12px;display:block;" alt="Mapa de ubicacion"/>
                            </td>
                        </tr>

                        <tr>
                            <td style="padding:0 40px 32px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e7eb;padding-top:20px;">
                                    <tr>
                                        <td>
                                            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                                                Reporte generado el ${date}
                                            </p>
                                            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
                                                Sistema de Mascotas Perdidas 612
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

