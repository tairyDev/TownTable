using Server.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Repositories
{
    public interface ITownRepository
    {
        Task<IEnumerable<Town>> GetAllTownsAsync();
        Task<Town> GetTownByIdAsync(int id);
        Task<Town> AddAsync(Town town);
        Task<Town> UpdateAsync(int id, Town town);
        Task DeleteAsync(int id);
    }
}
