using System;

namespace SideTask.Test.DemoFiles.Folder
{
    public class Airplane
    {
        //TODO: Consider adding fuel capacity and range properties
        public string Model { get; }
        public string Manufacturer { get; }
        public int Capacity { get; }
        public double MaxSpeedKph { get; }
        public double CurrentSpeedKph { get; private set; }
        public double AltitudeMeters { get; private set; }
        public bool EnginesOn { get; private set; }
        public bool InFlight => EnginesOn && AltitudeMeters > 0;

        public Airplane(string model, string manufacturer, int capacity, double maxSpeedKph)
        {
            if (string.IsNullOrWhiteSpace(model)) throw new ArgumentException("model required", nameof(model));
            if (string.IsNullOrWhiteSpace(manufacturer)) throw new ArgumentException("manufacturer required", nameof(manufacturer));
            if (capacity <= 0) throw new ArgumentOutOfRangeException(nameof(capacity));
            if (maxSpeedKph <= 0) throw new ArgumentOutOfRangeException(nameof(maxSpeedKph));

            Model = model;
            Manufacturer = manufacturer;
            Capacity = capacity;
            MaxSpeedKph = maxSpeedKph;
            CurrentSpeedKph = 0;
            AltitudeMeters = 0;
            EnginesOn = false;
        }

        public void StartEngines()
        {
            EnginesOn = true;
        }

        public void StopEngines()
        {
            if (AltitudeMeters > 0) throw new InvalidOperationException("Cannot stop engines while airborne.");
            EnginesOn = false;
            CurrentSpeedKph = 0;
        }

        public bool TakeOff(double targetAltitudeMeters = 1000, double climbRateMetersPerSecond = 5)
        {
            if (!EnginesOn) return false;
            if (AltitudeMeters > 0) return false;

            // Simple simulation: accelerate and climb
            CurrentSpeedKph = Math.Min(MaxSpeedKph * 0.6, MaxSpeedKph); // initial takeoff speed
            AltitudeMeters = Math.Max(AltitudeMeters, 1); // lift off
            AltitudeMeters = Math.Max(AltitudeMeters, targetAltitudeMeters);
            return true;
        }

        public bool Land()
        {
            if (!InFlight) return false;

            // simple landing: reduce speed and altitude to zero
            CurrentSpeedKph = 0;
            AltitudeMeters = 0;
            EnginesOn = false;
            return true;
        }

        public void Accelerate(double deltaKph)
        {
            if (!EnginesOn) throw new InvalidOperationException("Engines are off.");
            if (deltaKph < 0) throw new ArgumentOutOfRangeException(nameof(deltaKph));

            CurrentSpeedKph = Math.Min(MaxSpeedKph, CurrentSpeedKph + deltaKph);
        }

        public void Decelerate(double deltaKph)
        {
            if (deltaKph < 0) throw new ArgumentOutOfRangeException(nameof(deltaKph));

            CurrentSpeedKph = Math.Max(0, CurrentSpeedKph - deltaKph);
            if (CurrentSpeedKph == 0 && AltitudeMeters == 0)
            {
                EnginesOn = false;
            }
        }

        public void Climb(double meters)
        {
            if (!EnginesOn) throw new InvalidOperationException("Engines are off.");
            if (meters <= 0) throw new ArgumentOutOfRangeException(nameof(meters));

            AltitudeMeters += meters;
        }

        public void Descend(double meters)
        {
            if (meters <= 0) throw new ArgumentOutOfRangeException(nameof(meters));

            AltitudeMeters = Math.Max(0, AltitudeMeters - meters);
            if (AltitudeMeters == 0)
            {
                // when on ground, speed should not remain high
                CurrentSpeedKph = Math.Min(CurrentSpeedKph, 50); // taxi speed cap
            }
        }

        public override string ToString()
        {
            return $"{Manufacturer} {Model} (Capacity: {Capacity}) - Speed: {CurrentSpeedKph} kph, Altitude: {AltitudeMeters} m, EnginesOn: {EnginesOn}";
        }
    }
}