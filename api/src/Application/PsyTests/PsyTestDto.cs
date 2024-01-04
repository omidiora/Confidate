using Confidate.Application.Common.Mappings;
using Confidate.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confidate.Application.PsyTests
{
    public class PsyTestDto : IMapFrom<PsyTest>
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SourceLink { get; set; }
        public string Description { get; set; }
        public string Procedure { get; set; }
        public string Participation { get; set; }
        public bool IsActive { get; set; }
    }
}
