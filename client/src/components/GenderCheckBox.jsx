import React from "react";

export default function GenderCheckBox({ onGenderChange, selectedGender }) {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="gap-2 cursor-pointer label">
                    <span className="label-text text-white text-base">Male</span>
                <input type="checkbox" name="gender" onChange={() => onGenderChange("male")} checked={selectedGender === "male"} />
                </label>
            </div>
            <div className="form-control">
                <label className="gap-2 cursor-pointer label">
                    <span className="label-text text-white text-base">Female</span>
                <input type="checkbox" name="gender" onChange={() => onGenderChange("female")} checked={selectedGender === "female"} />
                </label>
            </div>
        </div>
    );
}
