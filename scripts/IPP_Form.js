// Initialize the modal
      const resultModal = new bootstrap.Modal(
        document.getElementById("resultModal")
      );

      // Create a set of valid cities for quick lookup
      const validCities = new Set(
        Array.from(document.getElementById("cityList").options).map(
          (opt) => opt.value
        )
      );

      // Add validation for city input
      document.getElementById("city").addEventListener("change", function (e) {
        const cityInput = e.target;
        const selectedCity = cityInput.value;

        if (!validCities.has(selectedCity)) {
          cityInput.setCustomValidity("Please select a city from the list");
          // Clear the input if it's not in our dataset
          cityInput.value = "";
        } else {
          cityInput.setCustomValidity("");
        }
      });

      document
        .getElementById("insuranceForm")
        .addEventListener("submit", async function (e) {
          e.preventDefault();
          const form = e.target;
          const data = {
            age: Number(form.age.value),
            weight: Number(form.weight.value),
            height: Number(form.height.value),
            income_lpa: Number(form.income_lpa.value),
            smoker: form.smoker.value === "true",
            city: form.city.value,
            occupation: form.occupation.value,
          };

          try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Network response was not ok");
            const result = await response.json();
            const prediction = result.response;

            // Define category colors
            const categoryColors = {
              High: "#dc3545", // Bootstrap danger
              Medium: "#ffc107", // Bootstrap warning
              Low: "#198754", // Bootstrap success
            };

            // Update modal content
            document.getElementById("modalContent").innerHTML = `
              <div class="text-center">
                <div class="mb-3">
                  <span class="text-success" style="font-size: 2.5rem;">
                    <i class="bi bi-check-circle-fill"></i>
                  </span>
                </div>
                
                <div class="mb-4">
                  <h5>Predicted Category</h5>
                  <span class="badge fs-5 px-4 py-2" 
                        style="background-color: ${
                          categoryColors[prediction.predicted_category]
                        }">
                    ${prediction.predicted_category}
                  </span>
                  <div class="mt-2 text-muted">
                    Confidence: ${(prediction.confidence * 100).toFixed(1)}%
                  </div>
                </div>

                <div class="mb-3">
                  <h5 class="mb-3">Probability Distribution</h5>
                  <div class="px-3">
                    ${Object.entries(prediction.class_probabilities)
                      .map(
                        ([category, prob]) => `
                      <div class="mb-3">
                        <div class="d-flex justify-content-between mb-1">
                          <span>${category}</span>
                          <span>${(prob * 100).toFixed(1)}%</span>
                        </div>
                        <div class="progress" style="height: 1.5rem;">
                          <div class="progress-bar" 
                               role="progressbar" 
                               style="width: ${
                                 prob * 100
                               }%; background-color: ${
                          categoryColors[category]
                        }"
                               aria-valuenow="${prob * 100}" 
                               aria-valuemin="0" 
                               aria-valuemax="100">
                          </div>
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                </div>
              </div>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            `;

            // Show the modal
            resultModal.show();
          } catch (error) {
            document.getElementById("modalContent").innerHTML = `
              <div class="alert alert-danger">
                Error: ${error.message}
              </div>`;
            resultModal.show();
          }
        });