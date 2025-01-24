import { useState, useEffect } from "react";

interface Location {
  id: string;
  name: string;
}

// New interface for API response
interface ProvinceApiResponse {
  id: string;
  name: string;
}

export function useLocation() {
  const [provinces, setProvinces] = useState<Location[]>([]);
  const [regencies, setRegencies] = useState<Location[]>([]);
  const [districts, setDistricts] = useState<Location[]>([]);
  const [villages, setVillages] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProvinces = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://open-api.my.id/api/wilayah/provinces",
      );
      const data: ProvinceApiResponse[] = await response.json();
      setProvinces(data.map((item) => ({ id: item.id, name: item.name })));
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegencies = async (provinceId: string) => {
    if (!provinceId) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://open-api.my.id/api/wilayah/regencies/${provinceId}`,
      );
      const data: ProvinceApiResponse[] = await response.json();
      setRegencies(data.map((item) => ({ id: item.id, name: item.name })));
    } catch (error) {
      console.error("Error fetching regencies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDistricts = async (regencyId: string) => {
    if (!regencyId) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://open-api.my.id/api/wilayah/districts/${regencyId}`,
      );
      const data: ProvinceApiResponse[] = await response.json();
      setDistricts(data.map((item) => ({ id: item.id, name: item.name })));
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVillages = async (districtId: string) => {
    if (!districtId) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://open-api.my.id/api/wilayah/villages/${districtId}`,
      );
      const data: ProvinceApiResponse[] = await response.json();
      setVillages(data.map((item) => ({ id: item.id, name: item.name })));
    } catch (error) {
      console.error("Error fetching villages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  return {
    provinces,
    regencies,
    districts,
    villages,
    isLoading,
    fetchRegencies,
    fetchDistricts,
    fetchVillages,
  };
}
