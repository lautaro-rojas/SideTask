using System;
using System.Collections.Generic;
using System.Linq;

namespace DemoFiles.Test
{
    /// <summary>
    /// Represents an item stored in a shopping cart.
    /// </summary>
    public sealed class CartItem
    {
        // TODO: Consider adding SKU or variant options for products
        // IDEA: Add TotalPrice property for convenience
        // NOTE: This is a note for future reference
        // FIXME: This needs to be fixed later
        // REFACTOR: Consider making CartItem immutable
        
        public string ProductId { get; }
        public string Name { get; }
        public decimal UnitPrice { get; private set; }
        public int Quantity { get; private set; }

        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal TotalPrice => UnitPrice * Quantity;

        public CartItem(string productId, string name, decimal unitPrice, int quantity = 1)
        {
            if (string.IsNullOrWhiteSpace(productId)) throw new ArgumentException("ProductId is required.", nameof(productId));
            if (unitPrice < 0) throw new ArgumentOutOfRangeException(nameof(unitPrice));
            if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));

            ProductId = productId;
            Name = name ?? string.Empty;
            UnitPrice = unitPrice;
            Quantity = quantity;
        }

        internal void ChangeQuantity(int newQuantity)
        {
            if (newQuantity <= 0) throw new ArgumentOutOfRangeException(nameof(newQuantity));
            Quantity = newQuantity;
        }

        internal void ChangeUnitPrice(decimal newPrice)
        {
            if (newPrice < 0) throw new ArgumentOutOfRangeException(nameof(newPrice));
            UnitPrice = newPrice;
        }
    }

    /// <summary>
    /// Simple shopping cart implementation.
    /// Thread-unsafe for simplicity; wrap with external synchronization if needed.
    /// </summary>
    public class Cart
    {
        private readonly Dictionary<string, CartItem> _items = new Dictionary<string, CartItem>(StringComparer.OrdinalIgnoreCase);

        public IReadOnlyCollection<CartItem> Items => _items.Values.ToList().AsReadOnly();

        public int TotalItems => _items.Values.Sum(i => i.Quantity);

        public decimal Subtotal => _items.Values.Sum(i => i.TotalPrice);

        public void AddItem(string productId, string name, decimal unitPrice, int quantity = 1)
        {
            if (string.IsNullOrWhiteSpace(productId)) throw new ArgumentException("ProductId is required.", nameof(productId));
            if (unitPrice < 0) throw new ArgumentOutOfRangeException(nameof(unitPrice));
            if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));

            if (_items.TryGetValue(productId, out var existing))
            {
                existing.ChangeQuantity(existing.Quantity + quantity);
                // Update price to latest provided
                existing.ChangeUnitPrice(unitPrice);
            }
            else
            {
                var item = new CartItem(productId, name, unitPrice, quantity);
                _items[productId] = item;
            }
        }

        public bool RemoveItem(string productId)
        {
            if (string.IsNullOrWhiteSpace(productId)) return false;
            return _items.Remove(productId);
        }

        public bool UpdateQuantity(string productId, int newQuantity)
        {
            if (string.IsNullOrWhiteSpace(productId)) return false;
            if (newQuantity <= 0) return false;

            if (_items.TryGetValue(productId, out var existing))
            {
                existing.ChangeQuantity(newQuantity);
                return true;
            }

            return false;
        }

        public void Clear() => _items.Clear();

        public decimal GetTotal(decimal taxRate = 0m, decimal discountAmount = 0m)
        {
            if (taxRate < 0) throw new ArgumentOutOfRangeException(nameof(taxRate));
            if (discountAmount < 0) throw new ArgumentOutOfRangeException(nameof(discountAmount));

            var subtotal = Subtotal;
            var taxed = subtotal + (subtotal * taxRate);
            var total = taxed - discountAmount;
            return total < 0 ? 0m : total;
        }

        public CartItem GetItem(string productId)
        {
            if (string.IsNullOrWhiteSpace(productId)) return null;
            _items.TryGetValue(productId, out var item);
            return item;
        }
    }
}