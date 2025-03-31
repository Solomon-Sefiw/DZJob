
using FluentValidation;
using HCMS.Services.DataService;


namespace DZJobs.Application.Features.Job.Commands.CreateJob
{
    public class CreateJobCommandValidator : AbstractValidator<CreateJobCommand>
    {
        private readonly IDataService dataService;

        public CreateJobCommandValidator(IDataService dataService)
        {
            this.dataService = dataService;
            //RuleFor(bu => bu).Must(IsBusinessUnitUnique).WithMessage("BusinessUnit Name Already Exist");
            //RuleFor(bu => bu).Must(IsBusinessUnitUniqueExpenceGl).WithMessage("Expence GL Already Exist");
            //RuleFor(bu => bu).Must(IsBusinessUnitUniqueIncome).WithMessage("Income GL Already Exist");


            //// Name is required and should not exceed 100 characters
            //RuleFor(bu => bu.Name)
            //    .NotEmpty()
            //    .WithMessage("BusinessUnit Name is required.")
            //    .Matches(@"^[a-zA-Z0-9 ]+$")
            //    .WithMessage("BusinessUnit Name must be alphanumeric and can include spaces.")
            //    .MaximumLength(100)
            //    .WithMessage("BusinessUnit Name must not exceed 100 characters.") // Corrected to 100 characters
            //    .MinimumLength(3)
            //    .WithMessage("BusinessUnit Name must be at least 3 characters long.");



            //// ParentId must be greater than or equal to 0
            //RuleFor(bu => bu.ParentId)
            //        .NotNull()
            //        .WithMessage("Parent Business Unit Required")
            //        .GreaterThanOrEqualTo(1)
            //        .WithMessage("Parent Business Unit Required");

            //    // Type must be a valid enum value
            //    RuleFor(bu => bu.Type)
            //        .IsInEnum()
            //        .WithMessage(" Business Unit Type Required");
            //// ExpenseGL is optional but should not exceed 50 characters
            //RuleFor(bu => bu.ExpenseGL)
            //     .NotEmpty()
            //     .WithMessage("Expense GL Required")
            //    .MaximumLength(21)
            //    .WithMessage("Expense must be 21 characters.")
            //    .Matches(@"^\d{2}-\d{2}-\d{3}-\d{3}-\d{7}$")
            //    .WithMessage("The GL Number must follow the format: XX-XX-XXX-XXX-XXXXXXX.");

            //// IncomeGL is optional but should not exceed 50 characters
            //RuleFor(bu => bu.IncomeGL)
            //        .NotEmpty()
            //        .WithMessage("Income GL Required")
            //        .MaximumLength(21)
            //        .WithMessage("IncomeGL must be 21 characters.")
            //        .Matches(@"^\d{2}-\d{2}-\d{3}-\d{3}-\d{7}$")
            //        .WithMessage("The GL Number must follow the format: XX-XX-XXX-XXX-XXXXXXX.");
            //   RuleFor(bu => bu)
            //        .Must(bu => !string.Equals(bu.ExpenseGL, bu.IncomeGL, StringComparison.OrdinalIgnoreCase))
            //        .WithMessage("Expense GL and Income GL must not be the same.");

            //// StaffStrength must be greater than or equal to 0 if specified
            //RuleFor(bu => bu.StaffStrength)
            //        .GreaterThanOrEqualTo(1)
            //        .When(bu => bu.StaffStrength.HasValue)
            //        .WithMessage("StaffStrength must Not equal to 0.");

        }
        //private bool IsBusinessUnitUnique(CreateBusinessUnitCommand command) => !dataService.BusinessUnits.Any(x => x.Name == command.Name);
        //private bool IsBusinessUnitUniqueExpenceGl(CreateBusinessUnitCommand command) => !dataService.BusinessUnits.Any(x => x.ExpenseGL == command.ExpenseGL);
        //private bool IsBusinessUnitUniqueIncome(CreateBusinessUnitCommand command) => !dataService.BusinessUnits.Any(x => x.IncomeGL == command.IncomeGL);

    }
}
