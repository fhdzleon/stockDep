import ProductList from "@/components/products/product.list";

async function LandingPage() {

  return (
    <div className="max-w-4xl mx-auto mb-40 lg:mb-0">
      <ProductList />
    </div>
  );
}

export default LandingPage;
