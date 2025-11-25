using System;

namespace SideTask.Test.DemoFiles
{
    public class Person : IEquatable<Person>
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string? Email { get; set; }
        // HACK: Phone number format validation needed
        public string? Phone { get; set; }

        public Person() { }

        // IDEA: Consider using a builder pattern for more complex object creation

        public Person(string firstName, string lastName, DateTime dateOfBirth, string? email = null, string? phone = null)
        {
            FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
            LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
            DateOfBirth = dateOfBirth;
            Email = email;
            Phone = phone;
        }

        public string FullName => $"{FirstName} {LastName}".Trim();

        public int Age
        {
            get
            {
                var today = DateTime.Today;
                var age = today.Year - DateOfBirth.Year;
                if (DateOfBirth.Date > today.AddYears(-age)) age--;
                return Math.Max(age, 0);
            }
        }

        // REFACTOR: Consider overriding == and != operators for better equality checks
        public override string ToString() => $"{FullName} (Age: {Age})";

        public override bool Equals(object? obj) => Equals(obj as Person);

        public bool Equals(Person? other)
        {
            if (other is null) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id == other.Id;
        }

        public override int GetHashCode() => Id.GetHashCode();

        public void Deconstruct(out string firstName, out string lastName, out DateTime dob)
        {
            firstName = FirstName;
            lastName = LastName;
            dob = DateOfBirth;
        }
    }
}