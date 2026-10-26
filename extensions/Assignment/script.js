document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.getElementById("theme");
    const regForm = document.getElementById("regform");
    const memberList = document.getElementById("memberList");
    const emptyNote = document.getElementById("emptyNote");
    const countSpan = document.getElementById("count");
    const successMsg = document.getElementById("successMsg");

    let memberCount = 0;

    // --- 1. Dark/Light Theme Toggle ---
    themeBtn.addEventListener("click", () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.body.removeAttribute("data-theme");
            themeBtn.textContent = "Dark Mode";
        } else {
            document.body.setAttribute("data-theme", "dark");
            themeBtn.textContent = "Light Mode";
        }
    });

    // --- 2. Form Validation & Submission ---
    regForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Inputs
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirm-password");
        const genderInput = document.getElementById("gender");
        const dobInput = document.getElementById("dob");
        const countryInput = document.getElementById("country");
        const phoneInput = document.getElementById("phone");

        // Clear previous error messages & highlight styles
        clearErrors();

        let isValid = true;

        // Name Validation
        if (nameInput.value.trim() === "") {
            setError(nameInput, "nameError", "Full name is required.");
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === "") {
            setError(emailInput, "emailError", "Email is required.");
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, "emailError", "Please enter a valid email address.");
            isValid = false;
        }

        // Password Validation
        if (passwordInput.value === "") {
            setError(passwordInput, "passwordError", "Password is required.");
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            setError(passwordInput, "passwordError", "Password must be at least 6 characters.");
            isValid = false;
        }

        // Confirm Password Validation
        if (confirmPasswordInput.value === "") {
            setError(confirmPasswordInput, "confirmError", "Please confirm your password.");
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            setError(confirmPasswordInput, "confirmError", "Passwords do not match.");
            isValid = false;
        }

        // Gender Validation
        if (genderInput.value === "") {
            setError(genderInput, "genderError", "Please select a gender.");
            isValid = false;
        }

        // Date of Birth Validation
        if (dobInput.value === "") {
            setError(dobInput, "dobError", "Date of birth is required.");
            isValid = false;
        }

        // Country Validation
        if (countryInput.value.trim() === "") {
            setError(countryInput, "countryError", "Country is required.");
            isValid = false;
        }

        // Phone Number Validation
        if (phoneInput.value.trim() === "") {
            setError(phoneInput, "phoneError", "Phone number is required.");
            isValid = false;
        }

        // If form passes all validation rules
        if (isValid) {
            const memberData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                country: countryInput.value.trim()
            };

            addMemberToList(memberData);

            // Show success banner
            successMsg.textContent = "Registration successful!";
            successMsg.classList.remove("hidden");

            // Reset Form
            regForm.reset();

            // Hide success message after 4 seconds
            setTimeout(() => {
                successMsg.classList.add("hidden");
            }, 4000);
        }
    });

    // Helper: Set error UI
    function setError(inputElement, errorSpanId, message) {
        inputElement.classList.add("input-error");
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    // Helper: Reset error UI
    function clearErrors() {
        const errorSpans = document.querySelectorAll(".error");
        errorSpans.forEach(span => span.textContent = "");

        const inputs = document.querySelectorAll("input, select, textarea");
        inputs.forEach(input => input.classList.remove("input-error"));

        successMsg.classList.add("hidden");
    }

    // Helper: Append new member to list
    function addMemberToList(member) {
        if (emptyNote) {
            emptyNote.remove();
        }

        const li = document.createElement("li");
        li.className = "member-item";
        li.innerHTML = `
            <div class="member-info">
                <h4>${escapeHTML(member.name)}</h4>
                <p>${escapeHTML(member.email)} • ${escapeHTML(member.country)}</p>
            </div>
        `;

        memberList.prepend(li);

        // Update Counter
        memberCount++;
        countSpan.textContent = memberCount;
    }

    // Helper: Prevent XSS attacks when displaying member names
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});