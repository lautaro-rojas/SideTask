using System;

namespace DemoFiles.Folder
{
    public class Car
    {
        public string Make { get; }
        public string Model { get; }
        public int Year { get; }
        // TODO: Consider adding fuel type or transmission type
        public bool IsEngineOn { get; private set; }
        public int CurrentSpeed { get; private set; } // km/h

        public Car(string make, string model, int year)
        {
            if (string.IsNullOrWhiteSpace(make)) throw new ArgumentException("Make is required", nameof(make));
            if (string.IsNullOrWhiteSpace(model)) throw new ArgumentException("Model is required", nameof(model));
            if (year < 1886) throw new ArgumentOutOfRangeException(nameof(year), "Year is invalid");

            Make = make;
            Model = model;
            Year = year;
            IsEngineOn = false;
            CurrentSpeed = 0;
        }

        public void StartEngine()
        {
            IsEngineOn = true;
        }

        public void StopEngine()
        {
            CurrentSpeed = 0;
            IsEngineOn = false;
        }

        public void Accelerate(int kmh)
        {
            if (!IsEngineOn) throw new InvalidOperationException("Cannot accelerate: engine is off.");
            if (kmh < 0) throw new ArgumentOutOfRangeException(nameof(kmh));
            CurrentSpeed += kmh;
        }

        public void Brake(int kmh)
        {
            if (kmh < 0) throw new ArgumentOutOfRangeException(nameof(kmh));
            CurrentSpeed = Math.Max(0, CurrentSpeed - kmh);
        }

        public override string ToString() =>
            $"{Year} {Make} {Model} - {CurrentSpeed} km/h {(IsEngineOn ? "(engine on)" : "(engine off)")}";
    }
}