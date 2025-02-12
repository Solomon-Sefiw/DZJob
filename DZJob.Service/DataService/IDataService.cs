

using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Services.DataService
{
    public interface IDataService
    {
        public DbSet<Job> Jobs { get; set; }

        void Save();
        Task SaveAsync(CancellationToken cancellationToken);
    }
}
