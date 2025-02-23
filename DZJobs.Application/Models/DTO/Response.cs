﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace User.Managment.Service.Models.DTO
{
    public class Response
    {
        public string? UserId { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
    }
}
