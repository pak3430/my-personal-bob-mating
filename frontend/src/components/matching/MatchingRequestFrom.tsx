// frontend/src/components/matching/MatchingRequestForm.tsx
import React, { useState } from "react";
import InputField from "../common/InputField";
import Button from "../common/Button";
import * as Constants from "../../utils/constants"; // 상수 임포트

interface MatchingRequestFormProps {
  onSubmit: (requestData: any) => void; // ERD MatchingRequest 필드에 맞게 타입 정의 필요
  isLoading?: boolean;
  error?: string | null;
}

const MatchingRequestForm: React.FC<MatchingRequestFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [region, setRegion] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredGender, setPreferredGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(2);
  const [preferredFood, setPreferredFood] = useState("");
  const [matchingMethod, setMatchingMethod] = useState(""); // 랜덤, 선호도

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      region,
      preferred_date: preferredDate,
      preferred_gender: preferredGender,
      age_range: ageRange,
      number_of_people: numberOfPeople,
      preferred_food: preferredFood,
      matching_method: matchingMethod,
    };
    onSubmit(requestData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <InputField
        label="지역"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        placeholder="예: 강남역"
        required
      />
      <InputField
        label="선호 날짜"
        type="date"
        value={preferredDate}
        onChange={(e) => setPreferredDate(e.target.value)}
        required
      />

      <div>
        <label className="text-sm font-medium mb-1 block">선호 성별</label>
        <select
          value={preferredGender}
          onChange={(e) => setPreferredGender(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택</option>
          {Constants.PREFERRED_GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <InputField
        label="선호 나이대"
        value={ageRange}
        onChange={(e) => setAgeRange(e.target.value)}
        placeholder="예: 20-30대"
      />

      <div>
        <label className="text-sm font-medium mb-1 block">인원수</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(Number(e.target.value))}
          min="2"
          max="6" // 최대 인원수
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">선호 음식</label>
        <select
          value={preferredFood}
          onChange={(e) => setPreferredFood(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택</option>
          {Constants.PREFERRED_FOODS.map((food) => (
            <option key={food} value={food}>
              {food}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium mb-1 block">매칭 방식</label>
        <select
          value={matchingMethod}
          onChange={(e) => setMatchingMethod(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">선택</option>
          {Constants.MATCHING_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <Button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
        disabled={isLoading}
      >
        {isLoading ? "매칭 요청 중..." : "매칭 요청하기"}
      </Button>
    </form>
  );
};

export default MatchingRequestForm;
