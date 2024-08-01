using Server.Core.Models;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class TownService:ITownService
    {
        public readonly ITownRepository _townRepository;
        public TownService(ITownRepository townRepository)
        {
            _townRepository = townRepository;
        }

        public async Task<IEnumerable<Town>> GetAllTownsAsync()
        {
            return await _townRepository.GetAllTownsAsync();
        }
        public async Task<Town> GetTownByIdAsync(int id)
        {
            var town = await _townRepository.GetTownByIdAsync(id);
            if (town == null)
            {
                return null;
            }
            return town;
        }
        public async Task<Town> AddAsync(Town town)
        {
            if (town != null)
            {
                var list = await _townRepository.GetAllTownsAsync();
                if (list.Where(t => t.Name == town.Name).Count() == 0)
                {
                    await _townRepository.AddAsync(town);
                    return town;
                }
            }
            return null;
        }
        public async Task<Town> UpdateAsync(int id, Town town)
        {
            if (town != null)
            {
                var list = await _townRepository.GetAllTownsAsync();
                if (list.Where(t => t.Name == town.Name).Count() == 0)
                {
                    await _townRepository.UpdateAsync(id, town);
                    return town;
                }
            }
            return null;
        }
        public async Task DeleteAsync(int id)
        {
            await _townRepository.DeleteAsync(id);
        }
    }
}
