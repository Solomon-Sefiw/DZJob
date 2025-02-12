using System.Net.Security;
using MailKit.Net.Smtp;
using MimeKit;
using User.Managment.Service.Models;
using User.Managment.Service.Services;
namespace User.Managment.Service.Repository
{
    public class EmailServices : IEmailServices
    {
        private readonly EmailConfiguration _emailConfiguration;

        public EmailServices(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }
        public void SendEmail(Message message)
        {
            var createEmail = CreateEmailMessage(message);
            Send(createEmail);
            //throw new NotImplementedException();
        }

        private void Send(MimeMessage message)
        {
            //using var client = new SmtpClient();
            //try
            //{
            //    client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, MailKit.Security.SecureSocketOptions.StartTls);
            //    client.AuthenticationMechanisms.Remove("XOAUTH2");
            //    client.Authenticate(_emailConfiguration.Username, _emailConfiguration.Password);
            //    client.Send(message);
            //}
            //catch (Exception ex)
            //{

            //    throw ex;
            //}



            using (var client = new SmtpClient())
            {
                try
                {
                    client.ServerCertificateValidationCallback =
                        new RemoteCertificateValidationCallback((sender, certificate, chain, sslPolicyErrors) => true);

                    client.Connect(_emailConfiguration.SmtpServer, _emailConfiguration.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    client.Authenticate(_emailConfiguration.Username, _emailConfiguration.Password);
                    client.Send(message);
                    client.Disconnect(true);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }



        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("email", _emailConfiguration.From));
            email.To.AddRange(message.To);
            email.Subject = message.Subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };
            return email;
        }
    }
}
