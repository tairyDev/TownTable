using Microsoft.EntityFrameworkCore;
using Server.Core.Models;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class TownRepository:ITownRepository
    {
        private readonly DataContext _context;
        public TownRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Town>> GetAllTownsAsync()
        {
            return await _context.Towns.ToListAsync();
        }
        public async Task<Town> GetTownByIdAsync(int id)
        {
            return await _context.Towns.FirstAsync(s => s.Id == id);
        }
        public async Task<Town> AddAsync(Town town)
        {
            await _context.Towns.AddAsync(town);
            await _context.SaveChangesAsync();
            return town;
        }
        public async Task<Town> UpdateAsync(int id, Town town)
        {
            var exitTown = await GetTownByIdAsync(id);
            exitTown.Name = town.Name;
            await _context.SaveChangesAsync();
            return exitTown;
        }
        public async Task DeleteAsync(int id)
        {
            var deleteTown = await GetTownByIdAsync(id);
            _context.Towns.Remove(deleteTown);
            await _context.SaveChangesAsync();
        }
    }
}

