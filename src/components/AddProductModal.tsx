
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: number;
  name: string;
  category: string;
  type: string;
  balance: string;
  price: number;
  status: 'active' | 'inactive';
  stock: number;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    type: '',
    balance: '',
    price: 0,
    status: 'active' as const,
    stock: 0,
  });

  const handleAdd = () => {
    if (newProduct.name && newProduct.category) {
      onAdd(newProduct);
      setNewProduct({
        name: '',
        category: '',
        type: '',
        balance: '',
        price: 0,
        status: 'active',
        stock: 0,
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-gray border-cyber-blue/20 text-cyber-light max-w-md">
        <DialogHeader>
          <DialogTitle className="text-cyber-blue">Add New Product</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-cyber-light">Product Name</Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-cyber-light">Category</Label>
            <Select
              value={newProduct.category}
              onValueChange={(value) => setNewProduct({...newProduct, category: value})}
            >
              <SelectTrigger className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-cyber-blue/20">
                <SelectItem value="Bank Logs">Bank Logs</SelectItem>
                <SelectItem value="PayPal Logs">PayPal Logs</SelectItem>
                <SelectItem value="Cards">Cards</SelectItem>
                <SelectItem value="CashApp Logs">CashApp Logs</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type" className="text-cyber-light">Type</Label>
            <Input
              id="type"
              value={newProduct.type}
              onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              placeholder="Enter product type"
            />
          </div>

          <div>
            <Label htmlFor="balance" className="text-cyber-light">Balance</Label>
            <Input
              id="balance"
              value={newProduct.balance}
              onChange={(e) => setNewProduct({...newProduct, balance: e.target.value})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              placeholder="$0,000"
            />
          </div>

          <div>
            <Label htmlFor="price" className="text-cyber-light">Price</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="stock" className="text-cyber-light">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
              className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light"
              placeholder="0"
            />
          </div>

          <div>
            <Label htmlFor="status" className="text-cyber-light">Status</Label>
            <Select
              value={newProduct.status}
              onValueChange={(value: 'active' | 'inactive') => setNewProduct({...newProduct, status: value})}
            >
              <SelectTrigger className="bg-cyber-gray/30 border-cyber-blue/20 text-cyber-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cyber-gray border-cyber-blue/20">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-cyber-blue/30 text-cyber-light hover:bg-cyber-blue/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            className="flex-1 bg-cyber-blue text-cyber-dark hover:bg-cyber-blue/80"
          >
            Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
