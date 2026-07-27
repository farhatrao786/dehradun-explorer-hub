import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/business")({
  component: BusinessPage,
});

function BusinessPage() {
  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h1>List Your Business</h1>
      <p>Welcome to TheDehradun.com Business Listing</p>

      <br />

      {/* Yahan se aapka form shuru hota hai */}
      <form action="https://api.web3forms.com/submit" method="POST" encType="multipart/form-data">
        
        <input type="hidden" name="access_key" value="ede5da8f-b1ae-4c47-a3cd-5f7106d8391c" />
        
        <div style={{ marginBottom: "15px" }}>
          <label>Business ka Naam:</label><br />
          <input type="text" name="Business_Name" required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone Number:</label><br />
          <input type="text" name="Phone_Number" required style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Dukan ya Business ki Photo upload karein:</label><br />
          <input type="file" name="Business_Image" accept="image/png, image/jpeg, image/jpg" style={{ padding: "8px", marginTop: "5px" }} />
        </div>
        
        <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", marginTop: "10px" }}>
          Submit Details
        </button>

      </form>
    </div>
  );
}
