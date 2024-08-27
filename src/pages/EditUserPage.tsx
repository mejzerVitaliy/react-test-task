import React from "react";
import Navbar from "../layout/Navbar";
import AccountSettings from "../features/editUser/model/AccountSettings";
import Title from "../layout/Title";
import { useGetUsersQuery } from "../features/editUser/api/usersApi";
import Loader from "../shared/ui/Loader";
import { useGetCountriesQuery } from "../features/editUser/api/countriesApi";
import { useGetDepartmentsQuery } from "../features/editUser/api/departmentsApi";
import { useGetStatusesQuery } from "../features/editUser/api/statusesApi";

const EditUserPage: React.FC = () => {
    const {
        data: users,
        isLoading: usersLoading,
        error: usersErrors,
    } = useGetUsersQuery();
    const {
        data: countries,
        isLoading: countriesLoading,
        error: countriesErrors,
    } = useGetCountriesQuery();
    const {
        data: departments,
        isLoading: departmentsLoading,
        error: departmentsErrors,
    } = useGetDepartmentsQuery();
    const {
        data: statuses,
        isLoading: statusesLoading,
        error: statusesErrors,
    } = useGetStatusesQuery();

    if (usersLoading || countriesLoading || departmentsLoading || statusesLoading)
        return <Loader />;

    if (usersErrors || countriesErrors || departmentsErrors || statusesErrors)
        console.error(
        usersErrors || countriesErrors || departmentsErrors || statusesErrors
        );

    if (users && countries && departments && statuses) return (
        <main className="w-full h-full">
            <Navbar editUsersPage />
            <main className="flex items-center justify-center mt-[88px] px-[100px] py-[80px]">
                <section className=" flex flex-col justify-between border border-solid border-black w-[1240px] h-[768px] max-w-[1400px] px-[80px] pt-[60px] pb-[80px]">
                    <Title title="EDIT USER" />

                    <AccountSettings
                        users={users}
                        countries={countries}
                        departments={departments}
                        statuses={statuses}
                    />
                </section>
            </main>
        </main>
    );
    
};

export default EditUserPage;
