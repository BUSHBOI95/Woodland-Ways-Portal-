// Placeholder for future functionality

console.log("Woodland Ways Portal App Loaded");

// Example: highlight clicked nav button
document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
