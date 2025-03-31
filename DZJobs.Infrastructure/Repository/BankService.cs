using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using DZJobs.Application.Interfaces;
using DZJobs.Application.Models;
using Microsoft.Extensions.Configuration;

public class BankService : IBankService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public BankService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }

    public async Task<BankPaymentResponse> ProcessPaymentAsync(ContractPayment payment)
    {
        var bankApiUrl = _configuration["BankApi:BaseUrl"] + "/transactions"; // Get Bank API URL from config

        var requestBody = new
        {
            senderAccount = payment.EmployerId,  // Employer's bank account
            receiverAccount = payment.FreelancerId,  // Freelancer's bank account
            amount = payment.Amount,
            currency = "USD",
            description = $"Milestone Payment for Milestone ID {payment.MilestoneId}"
        };

        var jsonContent = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

        try
        {
            var response = await _httpClient.PostAsync(bankApiUrl, jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                return new BankPaymentResponse
                {
                    Success = false,
                    Message = $"Bank API error: {response.ReasonPhrase}"
                };
            }

            var responseContent = await response.Content.ReadAsStringAsync();
            var paymentResponse = JsonSerializer.Deserialize<BankPaymentResponse>(responseContent);

            return paymentResponse ?? new BankPaymentResponse { Success = false, Message = "Invalid bank response" };
        }
        catch (Exception ex)
        {
            return new BankPaymentResponse
            {
                Success = false,
                Message = "Payment processing failed: " + ex.Message
            };
        }
    }
}
